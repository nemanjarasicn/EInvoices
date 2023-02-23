import React from 'react';
import RegistriesFormComponent, {
  RegistriesFormComponentProps,
} from '../components/RegistriesFormComponent';
import { CreateType } from '../models/registries.enums';
import { IProps } from '../models/registries.models';
import { useFeatureSettings } from '../settings';

type RegistriesCreateTemplateProps = {
  type: CreateType;
  typeFrom?: string;
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
          case CreateType.FORMCOMPANY:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMCOMPANY
                  ] as RegistriesFormComponentProps
                }
              />
            );
          case CreateType.FORMWAREHOUSE:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMWAREHOUSE
                  ] as RegistriesFormComponentProps
                }
              />
            );

          case CreateType.FORMDISTRIBUTOR:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMDISTRIBUTOR
                  ] as RegistriesFormComponentProps
                }
              />
            );

          case CreateType.FORMUNIT:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMUNIT
                  ] as RegistriesFormComponentProps
                }
              />
            );
          case CreateType.FORMGROUP:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMGROUP
                  ] as RegistriesFormComponentProps
                }
              />
            );
          case CreateType.FORMVAT:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMVAT
                  ] as RegistriesFormComponentProps
                }
              />
            );
          case CreateType.FORMUSERS:
            return (
              <RegistriesFormComponent
                props={
                  RegistriesCreateTemplatePageSettings[
                    CreateType.FORMUSERS
                  ] as RegistriesFormComponentProps
                }
              />
            );
          default:
            throw new Error('Pass Type of creation');
        }
      })()}
    </>
  );
}
