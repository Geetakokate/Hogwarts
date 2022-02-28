export type dropdownOptions = {
	label: string;
	value: string;
};

export type teacherObject = {
	id: number;
	name: string;
	attendance: string;
	subject: string;
	priority: number;
};

export type studentsSubjectObject = {
	id: number;
	name: string;
	assignedTeacher: string;
};

export type studentObject = {
	id: number;
	name: string;
	subjects: Array<studentsSubjectObject>;
};
