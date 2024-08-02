type Variant = 'primary' | 'secondary';

type User = {
	id: string;
	name: string;
	image: string;
};

type Message = {
	content: string;
	sender: User;
	insertedAt: string;
};
