window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const tasksListEl = document.querySelector("#tasks");
	const inProgressListEl = document.querySelector("#in-progress-tasks");
	const completedListEl = document.querySelector("#completed-tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const task = input.value;

		if (!task) {
			return;
		}

		const taskEl = createTaskElement(task);
		tasksListEl.appendChild(taskEl);

		input.value = '';
	});

	function createTaskElement(task) {
		const taskEl = document.createElement('div');
		taskEl.classList.add('task');
		taskEl.setAttribute('draggable', 'true');
		taskEl.addEventListener('dragstart', dragStart);
		taskEl.addEventListener('dragend', dragEnd);

		const taskContentEl = document.createElement('div');
		taskContentEl.classList.add('content');

		taskEl.appendChild(taskContentEl);

		const taskInputEl = document.createElement('input');
		taskInputEl.classList.add('text');
		taskInputEl.type = 'text';
		taskInputEl.value = task;
		taskInputEl.setAttribute('readonly', 'readonly');

		taskContentEl.appendChild(taskInputEl);

		const taskActionsEl = document.createElement('div');
		taskActionsEl.classList.add('actions');

		const taskEditEl = document.createElement('button');
		taskEditEl.classList.add('edit');
		taskEditEl.innerText = 'Szerkesztés';

		const taskDeleteEl = document.createElement('button');
		taskDeleteEl.classList.add('delete');
		taskDeleteEl.innerText = 'Törlés';

		taskActionsEl.appendChild(taskEditEl);
		taskActionsEl.appendChild(taskDeleteEl);

		taskEl.appendChild(taskActionsEl);

		taskEditEl.addEventListener('click', (e) => {
			if (taskEditEl.innerText.toLowerCase() === "szerkesztés") {
				taskEditEl.innerText = "Mentés";
				taskInputEl.removeAttribute("readonly");
				taskInputEl.focus();
			} else {
				taskEditEl.innerText = "Szerkesztés";
				taskInputEl.setAttribute("readonly", "readonly");
			}
		});

		taskDeleteEl.addEventListener('click', (e) => {
			if (confirm("Biztosan törölni akarod ezt a feladatot?")) {
				taskEl.remove();
			}
		});

		return taskEl;
	}

	function dragStart(e) {
		e.target.classList.add('dragging');
		setTimeout(() => {
			e.target.style.display = "none";
		}, 0);
	}

	function dragEnd(e) {
		e.target.classList.remove('dragging');
		e.target.style.display = "block";
	}

	window.allowDrop = function(e) {
		e.preventDefault();
	};

	window.drop = function(e) {
		e.preventDefault();
		const draggedTask = document.querySelector('.dragging');
		const dropZone = e.target.closest('.task-list').querySelector('div');
		dropZone.appendChild(draggedTask);
	};
});
