import { ISignupAPIResponse } from "./signupInterface"

interface IAPIResponse {
    loading: boolean,
    data: ISignupAPIResponse | unknown,
}

export default IAPIResponse;
