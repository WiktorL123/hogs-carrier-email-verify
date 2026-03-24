/*
import {
  ImageIcon,
  MoonIcon,
  OverflowIcon,
  PDFIcon,
  SunIcon,
  XIcon,
} from "@/components/CustomIcons";

[...]

<PDFIcon />
<ImageIcon />
<XIcon />
<OverflowIcon />
<MoonIcon />
<SunIcon />
*/

interface IconProps {
  className?: string;
}

// svg SunIcon z heroicons
export const SunIcon: React.FC<IconProps> = ({ className }) => (
  <div className={`group w-fit cursor-pointer ${className ?? ``}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      className="size-lg stroke-dark-100 group-hover:stroke-warning-400 group-active:stroke-warning-500 transition-colors"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  </div>
);

export const MoonIcon: React.FC<IconProps> = ({ className }) => (
  <div className={`group w-fit cursor-pointer ${className ?? ``}`}>
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1042_10924"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="30"
      >
        <circle cx="14" cy="16" r="14" fill="white" />
        <circle cx="19.5" cy="12.5" r="12.5" fill="black" />
      </mask>
      <g mask="url(#mask0_1042_10924)">
        <circle
          cx="14"
          cy="16"
          r="14"
          className="fill-base-900 group-hover:fill-primary-200 group-active:fill-primary-300 transition-colors"
        />
      </g>
      <path
        d="M19 3L19.8981 5.76393H22.8042L20.4531 7.47214L21.3511 10.2361L19 8.52786L16.6489 10.2361L17.5469 7.47214L15.1958 5.76393H18.1019L19 3Z"
        className="fill-transparent group-hover:fill-primary-200 transition-colors duration-200 delay-200"
      />
      <path
        d="M17.5 15L18.0613 16.7275H19.8776L18.4082 17.7951L18.9695 19.5225L17.5 18.4549L16.0305 19.5225L16.5918 17.7951L15.1224 16.7275H16.9387L17.5 15Z"
        className="fill-transparent group-hover:fill-primary-200 transition-colors duration-200 delay-100"
      />
    </svg>
  </div>
);

export const OverflowIcon: React.FC<IconProps> = ({ className }) => (
  <div className={`group w-fit cursor-pointer ${className ?? ``}`}>
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12.5"
        cy="13"
        r="12.5"
        className="fill-base-100 group-active:fill-base-300 transition-colors"
      />
      <circle
        cx="12.5"
        cy="8"
        r="1.5"
        className="fill-base-900 group-hover:fill-primary-400 transition-colors duration-200"
      />
      <circle
        cx="12.5"
        cy="13"
        r="1.5"
        className="fill-base-900 group-hover:fill-primary-400 transition-colors duration-200 delay-75"
      />
      <circle
        cx="12.5"
        cy="18"
        r="1.5"
        className="fill-base-900 group-hover:fill-primary-400 transition-colors duration-200 delay-150"
      />
    </svg>
  </div>
);

export const XIcon: React.FC<IconProps> = ({ className }) => (
  <div className={`group w-fit cursor-pointer ${className ?? ``}`}>
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.82837"
        width="25"
        height="4"
        rx="2"
        transform="rotate(45 2.82837 0)"
        className="fill-base-100 group-hover:fill-danger-500 group-active:fill-danger-700 transition-colors duration-200 group-active:duration-75"
      />
      <rect
        x="20.5061"
        y="2.82849"
        width="25"
        height="4"
        rx="2"
        transform="rotate(135 20.5061 2.82849)"
        className="fill-base-100 group-hover:fill-danger-500 group-active:fill-danger-700 transition-colors duration-200 group-active:duration-75"
      />
    </svg>
  </div>
);

export const ImageIcon: React.FC<IconProps> = ({ className }) => (
  <div className={`group w-fit cursor-pointer ${className ?? ``}`}>
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5342 21.5607L15.6845 18.735C14.3095 17.3712 13.6219 16.6894 12.8329 16.4402C12.139 16.221 11.3932 16.229 10.7042 16.4632C9.92071 16.7295 9.24807 17.426 7.90283 18.819L1.07532 25.5627M18.5342 21.5607L19.1174 20.9824C20.4941 19.6171 21.1824 18.9345 21.9724 18.6852C22.667 18.4661 23.4133 18.4748 24.1028 18.7098C24.8866 18.977 25.5592 19.6754 26.9041 21.072L28.3333 22.5104M18.5342 21.5607L25.3865 28.4265M1.07532 25.5627C1.12833 25.9932 1.2186 26.3335 1.3724 26.6353C1.69996 27.2782 2.22264 27.8009 2.86553 28.1284C3.59639 28.5008 4.55315 28.5008 6.46667 28.5008H22.8667C23.9844 28.5008 24.7759 28.5008 25.3865 28.4265M1.07532 25.5627C1 24.9511 1 24.1574 1 23.0341V6.63415C1 4.72064 1 3.76387 1.3724 3.03301C1.69996 2.39012 2.22264 1.86744 2.86553 1.53988C3.59639 1.16748 4.55315 1.16748 6.46667 1.16748H22.8667C24.7802 1.16748 25.737 1.16748 26.4678 1.53988C27.1107 1.86744 27.6334 2.39012 27.9609 3.03301C28.3333 3.76387 28.3333 4.72064 28.3333 6.63415V22.5104M28.3333 22.5104V23.0341C28.3333 24.9477 28.3333 25.9045 27.9609 26.6353C27.6334 27.2782 27.1107 27.8009 26.4678 28.1284C26.1639 28.2833 25.8209 28.3737 25.3865 28.4265M23.2083 9.70896C23.2083 11.596 21.6787 13.1256 19.7917 13.1256C17.9046 13.1256 16.375 11.596 16.375 9.70896C16.375 7.82199 17.9046 6.29229 19.7917 6.29229C21.6787 6.29229 23.2083 7.82199 23.2083 9.70896Z"
        stroke="#2F2C2D"
        className="stroke-dark-500 group-hover:stroke-primary-400 group-active:stroke-primary-600 transition-colors duration-200 group-active:duration-75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const PDFIcon: React.FC<IconProps> = ({ className }) => (
  <div className={`group w-fit cursor-pointer ${className ?? ``}`}>
    <svg
      width="34"
      height="32"
      viewBox="0 0 34 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <line
        x1="6.70711"
        y1="9.70711"
        x2="4.70711"
        y2="11.7071"
        className="stroke-danger-800 group-hover:stroke-dark transition-colors duration-200"
        strokeWidth="2"
      />{" "}
      <line
        x1="29.2929"
        y1="11.7071"
        x2="27.2929"
        y2="9.70711"
        className="stroke-danger-800 group-hover:stroke-dark transition-colors duration-200"
        strokeWidth="2"
      />{" "}
      <line
        x1="28"
        y1="31"
        x2="6"
        y2="31"
        className="stroke-dark-500 group-active:stroke-danger-500 transition-colors group-active:duration-75"
        strokeWidth="2"
      />{" "}
      <line
        x1="21"
        y1="1"
        x2="6"
        y2="1"
        className="stroke-dark-500 group-active:stroke-danger-500 transition-colors group-active:duration-75"
        strokeWidth="2"
      />{" "}
      <line
        x1="7"
        x2="7"
        y2="30"
        className="stroke-dark-500 group-active:stroke-danger-500 transition-colors group-active:duration-75"
        strokeWidth="2"
      />{" "}
      <line
        x1="27"
        y1="7"
        x2="27"
        y2="30"
        className="stroke-dark-500 group-active:stroke-danger-500 transition-colors group-active:duration-75"
        strokeWidth="2"
      />{" "}
      <line
        x1="21.5"
        x2="21.5"
        y2="7"
        className="stroke-dark-500 group-active:stroke-danger-500 transition-colors group-active:duration-75"
      />{" "}
      <line
        x1="28"
        y1="6.5"
        x2="21"
        y2="6.5"
        className="stroke-dark-500 group-active:stroke-danger-500 transition-colors group-active:duration-75"
      />{" "}
      <line
        x1="27.2929"
        y1="6.70711"
        x2="21.2929"
        y2="0.707107"
        className="stroke-dark-500 group-active:stroke-danger-500 transition-colors group-active:duration-75"
        strokeWidth="2"
      />{" "}
      <path
        d="M22.324 3.3238L25.2111 6.21093L22.1003 6.43535L22.324 3.3238Z"
        className="stroke-dark-500 fill-dark-500 group-active:stroke-danger-500 group-active:fill-danger-500 transition-colors group-active:duration-75"
      />{" "}
      <g filter="url(#filter0_d_654_3222)">
        {" "}
        <rect
          x="4"
          y="11"
          width="26"
          height="13"
          className="fill-danger-600 group-hover:fill-danger-800 transition-colors duration-200"
        />{" "}
      </g>{" "}
      <path
        d="M6.912 22V13.6H10.032C10.624 13.6 11.148 13.72 11.604 13.96C12.06 14.192 12.416 14.52 12.672 14.944C12.928 15.36 13.056 15.844 13.056 16.396C13.056 16.94 12.932 17.424 12.684 17.848C12.436 18.272 12.096 18.608 11.664 18.856C11.232 19.096 10.732 19.216 10.164 19.216H8.556V22H6.912ZM8.556 17.704H10.128C10.496 17.704 10.796 17.584 11.028 17.344C11.268 17.096 11.388 16.78 11.388 16.396C11.388 16.012 11.256 15.7 10.992 15.46C10.736 15.22 10.404 15.1 9.996 15.1H8.556V17.704ZM14.1425 22V13.6H16.8305C17.6865 13.6 18.4425 13.78 19.0985 14.14C19.7625 14.5 20.2785 14.996 20.6465 15.628C21.0225 16.252 21.2105 16.976 21.2105 17.8C21.2105 18.616 21.0225 19.34 20.6465 19.972C20.2785 20.604 19.7625 21.1 19.0985 21.46C18.4425 21.82 17.6865 22 16.8305 22H14.1425ZM15.7865 20.464H16.8305C17.2145 20.464 17.5705 20.396 17.8985 20.26C18.2265 20.124 18.5105 19.936 18.7505 19.696C18.9985 19.456 19.1905 19.176 19.3265 18.856C19.4625 18.528 19.5305 18.176 19.5305 17.8C19.5305 17.424 19.4625 17.076 19.3265 16.756C19.1905 16.428 18.9985 16.144 18.7505 15.904C18.5105 15.664 18.2265 15.476 17.8985 15.34C17.5705 15.204 17.2145 15.136 16.8305 15.136H15.7865V20.464ZM22.5448 22V13.6H27.9328V15.1H24.1888V17.116H27.3088V18.616H24.1888V22H22.5448Z"
        fill="#F8F9FA"
        className="fill-base-100"
      />{" "}
      <defs>
        {" "}
        <filter
          id="filter0_d_654_3222"
          x="0"
          y="11"
          width="34"
          height="21"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          {" "}
          <feFlood floodOpacity="0" result="BackgroundImageFix" />{" "}
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />{" "}
          <feOffset dy="4" /> <feGaussianBlur stdDeviation="2" />{" "}
          <feComposite in2="hardAlpha" operator="out" />{" "}
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />{" "}
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_654_3222"
          />{" "}
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_654_3222"
            result="shape"
          />{" "}
        </filter>{" "}
      </defs>{" "}
    </svg>
  </div>
);
