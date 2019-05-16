declare module '@storybook/react/demo' {
  export class Button extends React.Component<React.HTMLProps<Button>> {
  }

  export interface WelcomeProps {
    showApp: React.MouseEventHandler<Welcome>;
  }

  export class Welcome extends React.Component<WelcomeProps> {
  }
}
