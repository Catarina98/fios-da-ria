import styled from '@emotion/styled';
import ButtonDS from '@metyis-porto/douro-ui-button';
import { ButtonVariant } from '@typing/components/button';

export const ButtonStyled = styled(ButtonDS)<{
  typeBtn?: string;
  styled?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
  isParentHovered?: boolean;
}>`
  :active {
    font-weight: ${({ theme }) => theme.fontWeight.REGULAR};
  }

  gap: 0.5rem;

  ${({ typeBtn, theme, isParentHovered }) =>
    typeBtn === ButtonVariant.Primary &&
    `
      color: ${isParentHovered ? theme.colors.brand.primary : theme.colors.brand.white};
      background-color: ${isParentHovered ? theme.colors.brand.white : theme.colors.brand.primary};
      border: 1px solid ${isParentHovered ? theme.colors.brand.white : theme.colors.brand.primary};

      svg {
        fill: ${isParentHovered ? theme.colors.brand.primary : theme.colors.brand.white};
      }

      :hover {
        color: ${theme.colors.brand.primary};
        background-color: ${theme.colors.brand.white};
        border: 1px solid ${theme.colors.brand.white};

        svg {
          fill: ${theme.colors.brand.primary};
        }
      }

      :active {
        color: ${theme.colors.brand.primary};
        background-color: transparent;
        border: none;
        font-weight: ${theme.fontWeight.REGULAR};

        svg {
          fill: ${theme.colors.brand.primary};
        }
      }
  `}

  ${({ typeBtn, theme, isParentHovered }) =>
    typeBtn === ButtonVariant.Secondary &&
    `
      color: ${isParentHovered ? theme.colors.brand.white : theme.colors.brand.primary};
      background-color: ${isParentHovered ? theme.colors.brand.primary : 'transparent'};
      border: 1px solid ${theme.colors.brand.primary};

      svg {
        fill: ${isParentHovered ? theme.colors.brand.white : theme.colors.brand.primary};
      }

      :hover {
        color: ${theme.colors.brand.white};
        background-color: ${theme.colors.brand.primary};

        svg {
          fill: ${theme.colors.brand.white};
        }
      }

      :active {
        color: ${theme.colors.brand.primary};
        background-color: transparent;
        font-weight: ${theme.fontWeight.REGULAR};
        border: none;

        svg {
          fill: ${theme.colors.brand.primary};
        }
      }
  `}

  ${({ typeBtn, theme, isParentHovered }) =>
    theme &&
    typeBtn === ButtonVariant.Tertiary &&
    `
      color: ${theme.colors.brand.primary};
      background-color: ${isParentHovered ? theme.colors.brand.white : 'transparent'};
      border: ${isParentHovered ? `1px solid ${theme.colors.brand.grey}` : 'none'};

      svg {
        fill: ${theme.colors.brand.primary};
      }

      :hover {
        color: ${theme.colors.brand.primary};
        background-color: ${theme.colors.brand.grey};
        border: 1px solid ${theme.colors.brand.grey};
      }


      :active {
        font-weight: ${theme.fontWeight.REGULAR};
      }
  `}

  ${({ styled, typeBtn, theme, isParentHovered }) =>
    theme &&
    typeBtn === ButtonVariant.Custom &&
    `
      color: ${isParentHovered ? styled?.backgroundColor : styled?.textColor};
      background-color: ${isParentHovered ? styled?.textColor : styled?.backgroundColor};
      border: 1px solid ${isParentHovered ? styled?.textColor : styled?.borderColor};

      svg {
        fill: ${isParentHovered ? styled?.backgroundColor : styled?.textColor};
      }

      :hover {
        color: ${styled?.backgroundColor};
        background-color: ${styled?.textColor};
        border-color: ${styled?.textColor};

        svg {
          fill: ${styled?.backgroundColor};
        }
      }

      :active {
        background-color: transparent;
        font-weight: ${theme.fontWeight.REGULAR};
        border: none;
      }
  `}
`;
