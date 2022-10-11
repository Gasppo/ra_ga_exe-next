import { NextApiResponse } from "next";

export function generateMockRes<ExpectedResponse>() {
    const json = jest.fn<any, ExpectedResponse[]>();
    const status = jest.fn().mockReturnValue({ json });
    return { res: { status } as unknown as NextApiResponse, json, status };
}