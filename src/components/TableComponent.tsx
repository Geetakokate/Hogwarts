import React, { ReactElement } from 'react';
import { Table } from 'reactstrap';

type Props = {
	headers: Array<string>;
	children: ReactElement<any, any>;
	config: {
		className: string;
	};
};

const TableComponent = ({ headers, children, config }: Props) => {
	return (
		<Table className={config.className}>
			<thead>
				<tr>
					{headers.map((header, index) => (
						<th key={`header-${index}`}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</Table>
	);
};

export default TableComponent;
