import React from "react";
import ArticlesFormComponent, {
    ArticlesFormComponentProps,
} from "../components/ArticlesFormComponent";
import { CreateType } from "../models/articles.enums";
import { IProps } from "../models/articles.models";
import { useFeatureSettings } from "../settings";

type ArticlesCreateTemplateProps = {
  type: CreateType;
};

export default function RegistriesCreateTemplatePage({
  props,
}: IProps<ArticlesCreateTemplateProps>): JSX.Element {
  const { ArticlesCreateTemplatePageSettings } = useFeatureSettings();
  return (
    <>
      {(() => {
        switch (props.type) {
          case CreateType.FORMARTICLES:
            return (
              <ArticlesFormComponent
                props={
                  ArticlesCreateTemplatePageSettings[
                    CreateType.FORMARTICLES
                  ] as ArticlesFormComponentProps
                }
              />
            );
          default:
            throw new Error("Pass Type of creation");
        }
      })()}
    </>
  );
}
