export interface UserAuth {
	email: string;
	password: string;
}

export interface Todo {
	id: number;
	todo: string;
	isCompleted: boolean;
	userId: number;
}
