import React from 'react'
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import TodoList from './TodoList';
import mockData from './MockData';

describe('todo list test', () => {
    it('should show title of todo list', () => {
        render(<TodoList todo={mockData} />);
        mockData.forEach((d) => expect(screen.getByText(d.title)).toBeInTheDocument());
    });
});