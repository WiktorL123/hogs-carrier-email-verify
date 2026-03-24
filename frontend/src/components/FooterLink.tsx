import { AnchorHTMLAttributes } from "react";

interface FooterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  linkType?: "external" | "internal";
  color?: "blue" | "red";
}

export function FooterLink({
  linkType = "internal",
  color = "blue",
  href,
  children,
  ...props
}: FooterLinkProps) {
  return (
    <a href={href} {...props} target="_blank">
      {linkType === "external" && (
        <span
          className={`inline-block w-[0.7rem] h-[1.8rem] poppins-12-600 pr-sm ${
            color === "blue" ? "text-primary-400" : ""
          } ${color === "red" ? "text-danger-600" : ""}`}
        >
          &gt;
        </span>
      )}
      <p className="inline poppins-12-600">{children}</p>
    </a>
  );
}
