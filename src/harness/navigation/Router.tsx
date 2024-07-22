import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Harness from '@harness/Harness';
import EmployeeAssignment from '@pages/employee-assignment/EmployeeAssignment';
import ErrorPage from '@pages/error/ErrorPage';
import Tasks from '@pages/tasks/Tasks';
import TaskCompletion from '@pages/tasks-completion/TaskCompletion';

export type RoleType = 'admin' | 'executor';

const Router = () => {
	const role: RoleType = 'admin';
	return (
		<Routes>
			<Route path="/" element={<Harness />}>
				<Route path="tasks" element={<Tasks userRole={role} />} />
				<Route path="tasks/:id" element={role === 'admin' ? <EmployeeAssignment /> : <TaskCompletion />} />
				<Route path="/error" element={<ErrorPage />} />
				<Route path="/" element={<Navigate to="/tasks" />} />
				<Route path="*" element={<Navigate to="/tasks" />} key="*" />
			</Route>
		</Routes>
	);
};

export default Router;
