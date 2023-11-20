import { render, screen, cleanup } from '@testing-library/react'
import List from '../FileDrop/FileDrop.js';

afterEach(() => {
    cleanup();
});

//Testing if status message is in the document, and rendered
test("Test rendering and inclusion of filedrop-todo-1", () => {
    render(<List />);
    const todoElement = screen.queryByTestId('filedrop-todo-1');
    expect(todoElement).toBeInTheDocument();
});

//Testing if drag and drop box is in the document, and rendered
test("Test rendering and inclusion of filedrop-todo-2", () => {
    render(<List />);
    const todoElement = screen.queryByTestId('filedrop-todo-2');
    expect(todoElement).toBeInTheDocument();
});

//Testing if drag and drop header is in the document, and rendered
test("Test rendering and inclusion of filedrop-todo-3", () => {
    render(<List />);
    const todoElement = screen.queryByTestId('filedrop-todo-3');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('Drag & Drop your files to upload');

});


