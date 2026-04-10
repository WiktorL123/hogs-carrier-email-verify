"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { Input } from "./Input";
import { Logo } from "./Logo";
import { VerfificationResults } from "./VerificationResults";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiResponse } from "@/types/Response";
import { motion } from "framer-motion";
import { mockApiResponse } from "@/mocks/exampleVerfication";
import { useTranslations } from "next-intl";

export function EmailSection() {
  const context = useContext(ThemeContext);
  const t = useTranslations("EmailSection");
  const [isValidEmail, setIsValidEmail] = useState(false);
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const [submittedEmail, setSubmittedEmail] = useState("");

  // const sendData = async (formData: { email: string }) => {
  //   const url = process.env.NEXT_PUBLIC_API_URL;
  //   const response = await fetch(`${url}/verify-email`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Bad post");
  //   }

  //   const apiResponse: apiResponse = await response.json();
  //   return apiResponse;
  // };

  const sendData = async (formData: { email: string }) => {
    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${url}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Bad post");
      }

      const responseData: apiResponse = await response.json();
      return responseData;
    } catch (error) {
      console.warn(
        "Brak połączenia z backendem. Ładuję zmockowane dane...",
        error,
      );
      return mockApiResponse as unknown as apiResponse;
    }
  };

  const {
    mutate,
    isPending,
    data,
    reset: resetMutation,
  } = useMutation({
    mutationFn: sendData,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const emailValue = watch("email");

  useEffect(() => {
    if (data && emailValue !== submittedEmail) {
      resetMutation();
      setSubmittedEmail("");
    }
  }, [emailValue, data, submittedEmail, resetMutation]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        emailValue &&
        emailRegex.test(emailValue) &&
        emailValue !== submittedEmail
      ) {
        setSubmittedEmail(emailValue);
        mutate({ email: emailValue });
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [emailValue, submittedEmail, mutate]);

  if (!context) {
    return (
      <header className="h-[8vh] bg-base-200 px-md xs:px-3xl py-md flex justify-between opacity-0" />
    );
  }

  const onSubmit = (data: { email: string }) => {
    setSubmittedEmail(data.email);
    mutate(data);
  };

  const { theme } = context;

  return (
    <motion.form
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center py-7xl items-center gap-xl"
    >
      <div className="flex flex-col md:flex-row items-center gap-sm">
        <h1 className="poppins-28-600">{t("title")}</h1>
        <Logo variant={theme} />
      </div>
      <div className="flex flex-col gap-xl items-center justify-center w-full">
        <div className="w-full max-w-[52.4rem] px-[1.2rem]">
          <Controller
            name="email"
            control={control}
            rules={{
              required: t("emailRequired"),
              pattern: {
                value: emailRegex,
                message: t("emailMessage"),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                maxLength={254}
                placeholder={t("inputPlaceholder")}
                variant="search"
                valid={isValidEmail}
                errorMessage={errors.email?.message}
                disabled={isPending}
                inputLengthMax={254}
                inputLength={emailValue.length}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/\s/g, "").toLowerCase();
                  field.onChange(value);
                  setIsValidEmail(emailRegex.test(value));
                }}
              />
            )}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <VerfificationResults
            result={data}
            isPending={isPending}
            email={submittedEmail}
          />
        </motion.div>
      </div>
    </motion.form>
  );
}
