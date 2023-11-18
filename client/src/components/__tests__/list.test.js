import { render, screen, cleanup } from '@testing-library/react'
import List from '../FileDrop/List.js';

afterEach(() => {
    cleanup();
});

//Testing if "Uploaded Files" is in the document, and rendered
test("Test rendering and inclusion of list-todo-1", () => {
    render(<List />);
    const todoElement = screen.getByTestId('list-todo-1');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('Uploaded Files');
});




