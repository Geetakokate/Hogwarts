import React, { useState } from 'react';
import { Button, Collapse, Row, Col } from 'reactstrap';
import CardComponent from '../../components/CardComponent';
import TableComponent from '../../components/TableComponent';
import { TEACHERS_LIST } from '../api/teachersApi';

const TeachersHierarchy = () => {
	const [collapse, setCollapse] = useState(false),
		tableHeaders = ['Teacher Name', 'Designation', 'Subject', 'Priority'],
		toggle = () => {
			setCollapse(prevState => !prevState);
		};

	return (
		<>
			<Row>
				<Col>
					<Button onClick={toggle} className="float-left mb-4">
						Teachers Hierarchy
					</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Collapse isOpen={collapse}>
						<CardComponent title="">
							<TableComponent headers={tableHeaders} config={{ className: '' }}>
								<>
									{TEACHERS_LIST.map(teacher => {
										return (
											<tr key={`teacher-hierarchy-${teacher.id}`}>
												<td>{teacher.name}</td>
												<td>{teacher.designation}</td>
												<td>{teacher.subject}</td>
												<td>{teacher.priority}</td>
											</tr>
										);
									})}
								</>
							</TableComponent>
						</CardComponent>
					</Collapse>
				</Col>
			</Row>
		</>
	);
};

export default TeachersHierarchy;
