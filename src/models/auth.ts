type LoginRequestDto = {
	login: string;
	password: string;
};

type LoginRequestModel = {
	body: LoginRequestDto;
};

type GetAuthResponseDto = Array<string>;

export { LoginRequestDto, LoginRequestModel, GetAuthResponseDto };
