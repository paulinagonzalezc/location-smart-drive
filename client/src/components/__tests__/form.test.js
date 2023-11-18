import { render, screen, cleanup } from '@testing-library/react'
import Form from '../Form/Form.js';

afterEach(() => {
    cleanup();
});

//Testing if "Please provide a city name and upload a file below:" is in the document, and rendered
test("Test rendering and inclusion of form-todo-1", () => {
    render(<Form />);
    const todoElement = screen.getByTestId('form-todo-1');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('Please provide a city name and upload a file below:');
});

//Testing if "Select a file to upload:" is in the document, and rendered
test("Test rendering and inclusion of form-todo-2", () => {
    render(<Form />);
    const todoElement = screen.getByTestId('form-todo-2');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('Select a file to upload:');
});

//Testing if submit button is in the document, and rendered
test("Test rendering and inclusion of form-todo-3", () => {
    render(<Form />);
    const todoElement = screen.getByTestId('form-todo-3');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('Submit');
});

//Testing if message displays after submitting is in the document, and rendered
test("Test rendering and inclusion of form-todo-4", () => {
    render(<Form />);
    const todoElement = screen.getByTestId('form-todo-4');
    expect(todoElement).toBeInTheDocument();
});

