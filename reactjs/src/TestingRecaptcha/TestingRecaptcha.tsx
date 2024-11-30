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
        "X-API-Key": "32059d5b-c3cd-4bfa-9825-d6988ec3350f",
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
    <>{show ? <ReCAPTCHA sitekey="client key" onChange={onChange} /> : null},</>
  );
};

export default TestingRecaptcha;
