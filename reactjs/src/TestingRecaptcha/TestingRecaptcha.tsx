import axios from "axios";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const TestingRecaptcha = () => {
  const [show, setShow] = useState(true);
  function onChange(value: string | null) {
    axios({
      url: "http://localhost:7000/api-developer/v1/yusuf_basori/dsfa/coba-captcha",
      method: "POST",
      headers: {
        "X-API-KEY": import.meta.env.VITE_WEBIVERT_API_KEY,
      },
      data: {
        haha: "aaa",
        recaptcha: value,
      },
    })
      .then(() => {
        console.log("done");
        setShow(false);
      })
      .catch(() => {
        setShow(false);
      });
    console.log("Captcha value:", value);
  }

  useEffect(() => {
    if (!show) {
      setShow(true);
    }
  }, [show]);

  return (
    <>
      {show ? (
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={onChange}
        />
      ) : null}
      ,
    </>
  );
};

export default TestingRecaptcha;
