import React, { Suspense } from "react";
import { StyledH2 } from "../components/ui/StyledH2";
import Container from "@material-ui/core/Container";
import { StyledP } from "../components/ui/StyledP";
import { useForm } from "react-hook-form";
import { StyledText } from "../components/ui/StyledText";
import { StyledForm } from "../components/ui/StyledForm";
import { StyledH3 } from "../components/ui/StyledH3";
import { StyledTextarea } from "../components/ui/StyledTextarea";
import { StyledSubmit } from "../components/ui/StyledSubmit";
import { useTranslation } from "react-i18next";

export const About: React.FC = () => {
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log("sended:", data);
  };

  return (
    <Suspense fallback={"loading"}>
      <Container maxWidth="md">
        <StyledH2>{t("headers.about")}</StyledH2>
        <StyledP>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa
          esse iste iure nam nostrum saepe sint ullam? Deserunt dignissimos
          ducimus iste molestias non! Adipisci culpa cupiditate distinctio
          dolorem, dolorum esse exercitationem laboriosam mollitia
          necessitatibus perspiciatis placeat possimus quaerat sequi ullam
          voluptate? Cumque dolorum earum eligendi error harum mollitia
          temporibus veniam. Architecto asperiores atque blanditiis consequuntur
          corporis culpa cupiditate dignissimos dolore doloribus expedita facere
          fuga fugiat fugit harum id impedit, incidunt itaque libero magnam
          magni molestiae mollitia nulla numquam obcaecati odio provident quae
          quas qui quia, quisquam quod recusandae rem sed similique soluta ut
          voluptatum? Molestiae neque sequi temporibus totam!{" "}
        </StyledP>
        <div>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>

            <StyledH3>{t("form.headers.contact us")}</StyledH3>

            <StyledText
              border={errors.subject ? "2px solid red" : ""}
              color={"black"}
              fontSize={"16px"}
              type="text"
              placeholder={t("form.fields.subject")}
              {...register("subject", { required: true, maxLength: 15 })}
            />
            {errors.subject && (
              <i>
                <b>{t("form.errors.subject")}</b>
              </i>
            )}

            <StyledText
              border={errors.age ? "2px solid red" : ""}
              color={"black"}
              fontSize={"16px"}
              type="text"
              placeholder={t("form.fields.age")}
              {...register("age", {
                required: true,
                pattern: /\d?\d/,
                min: 18,
                max: 99,
              })}
            />
            {errors.age && (
              <i>
                <b>{t("form.errors.age")}</b>
              </i>
            )}

            <StyledTextarea
              border={errors.message ? "2px solid red" : ""}
              color={"black"}
              fontSize={"16px"}
              placeholder={t("form.fields.message")}
              {...register("message", { required: true })}
            />
            {errors.message && (
              <i>
                <b>{t("form.errors.message")}</b>
              </i>
            )}

            <StyledSubmit
              type="submit"
              disabled={!isValid || Object.keys(errors).length > 0}
            >
              {t("form.buttons.submit")}
            </StyledSubmit>
          </StyledForm>
        </div>
      </Container>
    </Suspense>
  );
};
