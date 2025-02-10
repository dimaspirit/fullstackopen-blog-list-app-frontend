import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { describe } from "vitest";

const getFullTitle = (title, author) => `${title} by ${author}`;

describe("<Blog />", () => {
  let container;

  const id = "qwertyui1";
  const title = "Title of first blog note";
  const author = "Coolest author";
  const likesCount = 1;

  const blog = {
    id,
    title,
    author,
    url: "https://someurls.com",
    likes: likesCount,
    user: {
      blogs: [id],
    },
  };

  const onUpdate = () => {};
  const onDelete = () => {};

  test("renders title", async () => {
    render(<Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />);

    const element = screen.getByText(getFullTitle(title, author));
    expect(element).toBeDefined();
  });

  test("at start the details are not displayed", () => {
    const { container } = render(
      <Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />,
    );
    const descriptionEl = container.querySelector("#blog-description");
    expect(descriptionEl).toHaveStyle("display: none");
  });

  test("after clicking the button, details are displayed", async () => {
    const { container } = render(
      <Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />,
    );

    const user = userEvent.setup();
    const buttonEl = screen.getByText("show");
    await user.click(buttonEl);

    const detailsEl = container.querySelector("#blog-description");
    expect(detailsEl).not.toHaveStyle("display: none");
  });

  test("after clicking the button, details are displayed", async () => {
    const { container } = render(
      <Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />,
    );

    const user = userEvent.setup();
    const buttonEl = screen.getByText("show");
    await user.click(buttonEl);

    const detailsEl = container.querySelector("#blog-description");
    expect(detailsEl).not.toHaveStyle("display: none");
  });

  test("likes button works", async () => {
    const user = userEvent.setup();
    const onUpdateMockHandler = vi.fn();

    render(
      <Blog blog={blog} onUpdate={onUpdateMockHandler} onDelete={onDelete} />,
    );

    const buttonEl = screen.getByText("Like");

    await user.click(buttonEl);
    await user.click(buttonEl);

    expect(onUpdateMockHandler.mock.calls).toHaveLength(2);
  });
});
