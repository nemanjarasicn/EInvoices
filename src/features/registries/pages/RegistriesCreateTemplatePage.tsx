import React from "react";
import RegistriesFormComponent, {
  RegistriesFormComponentProps,
} from "../components/RegistriesFormComponent";
import { CreateType } from "../models/registries.enums";
import { IProps } from "../models/registries.models";
import { useFeatureSettings } from "../settings";

type RegistriesCreateTemplateProps = {
  type: CreateType;
};

export default function RegistriesCreateTemplatePage({
  props,
}: IProps<RegistriesCreateTemplateProps>): JSX.Element {
  const { RegistriesCreateTemplatePageSettings } = useFeatureSettings();
  return (
    <>
      {(() => {
        switch (props.type) {
          case CreateType.FORMOBJECT:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMOBJECT
                  ] as RegistriesFormComponentProps
                }
              />
            );
          case CreateType.FORMMARKETPLACE:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMMARKETPLACE
                  ] as RegistriesFormComponentProps
                }
              />
            );
            case CreateType.FORMPOINTOFSALE:
              return (
                <RegistriesFormComponent
                  props={
                    RegistriesCreateTemplatePageSettings[
                      CreateType.FORMPOINTOFSALE
                    ] as RegistriesFormComponentProps
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
