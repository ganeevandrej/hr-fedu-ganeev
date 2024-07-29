import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Harness from '@harness/Harness';
import EmployeeAssignment from '@pages/employee-assignment/EmployeeAssignment';
import ErrorPage from '@pages/error/ErrorPage';
import Login from '@pages/login/Login';
import Tasks from '@pages/tasks/Tasks';
import TaskCompletion from '@pages/tasks-completion/TaskCompletion';
import TaskRejected from '@pages/tasks-rejected/TaskRejected';

export type RoleType = 'admin' | 'executor';

const Router = () => {
	const role: RoleType = 'admin';
	return (
		<Routes>
			<Route path="/" element={<Harness />}>
				<Route path="tasks" element={<Tasks userRole={role} />} />
				<Route path="tasks/:id" element={role === 'admin' ? <EmployeeAssignment /> : <TaskCompletion />} />
				<Route path="tasks/:id/rejected" element={<TaskRejected />} />
				<Route path="/error" element={<ErrorPage />} />
				<Route path="/" element={<Navigate to="/tasks" />} />
				<Route path="*" element={<Navigate to="/tasks" />} key="*" />
			</Route>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default Router;
