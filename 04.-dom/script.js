const input = document.querySelector("#skill-input");
const addButton = document.querySelector("#add-btn");
const counter = document.querySelector("#counter");
const list = document.querySelector("#skills-list");
const clearButton = document.querySelector("#clear-btn");

const handleClearAll = () => {
  list.innerHTML = "";
  counter.textContent = `${list.children.length} skills added`;
};

const handleAddButton = () => {
  const value = input.value.trim();

  if (value === "") return;

  const existingSkills = list.querySelectorAll("span");

  const isDuplicate = Array.from(existingSkills).some(
    (span) => span.textContent.toLowerCase() === value.toLowerCase(),
  );

  if (isDuplicate) {
    alert(`"${value}" is already in your skills list!`);
    return;
  }

  const li = document.createElement("li");
  li.className =
    "flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm gap-4  mb-2   ";
  const skillText = document.createElement("span");
  skillText.className = "text-gray-700 font-medium";
  skillText.textContent = value;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className =
    "text-red-500 hover:text-red-700 text-sm font-medium transition-colors";
  removeButton.addEventListener("click", () => {
    li.remove();
    counter.textContent = "0 skills added";
  });

  li.appendChild(skillText);
  li.appendChild(removeButton);
  list.appendChild(li);

  input.value = "";

  counter.textContent = `${list.children.length} skills added`;
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAddButton();
});

addButton.addEventListener("click", () => {
  handleAddButton();
});

clearButton.addEventListener("click", () => {
  handleClearAll();
});
