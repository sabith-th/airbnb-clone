import { RegisterMutationVariables } from "../../schemaTypes";
interface Props {
    children: (data: {
        submit: (values: RegisterMutationVariables) => Promise<null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: import("react").ComponentClass<Props, any>;
export {};
