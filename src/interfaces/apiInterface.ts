import { ISignupAPIResponse } from "./signupInterface"

interface IAPIResponse {
    loading: boolean,
    data: ISignupAPIResponse | null,
}

export default IAPIResponse;
