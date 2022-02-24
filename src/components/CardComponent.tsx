import React, { ReactElement } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

type Props = {
	title: string;
	children: ReactElement<any, any>;
};

const CardComponent = ({ title, children }: Props) => {
	return (
		<Card className="scroll">
			<CardTitle tag="h6" className="m-2">
				{title}
			</CardTitle>
			<CardBody>{children}</CardBody>
		</Card>
	);
};

export default CardComponent;
