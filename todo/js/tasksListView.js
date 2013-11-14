/*
    TasksListView

    View that knows how to render a TasksModel as a list.
    Each task has a checkbox next to it, and you can
    click that to mark the task as done.
*/

var TasksListView = {
	render: function() {
		var idx;
		var task;
		var clonedTemplate;
		var titleElem;
		var doneCb;

		this.container.empty();

		var tasks = this.model.getTasks();
		for (idx = 0; idx < tasks.length; ++idx) {
			task = tasks[idx];

			clonedTemplate = this.template.clone();
			titleElem = clonedTemplate.find('[data-model-attr="title"]');
			doneCb = clonedTemplate.find('[data-model-attr="done"]');
			titleElem.html(task.title);

			if (task.done) {
				titleElem.addClass('done');
				doneCb.attr('checked', true);
			}

			doneCb.click({model: this.model, task: task}, function(evt){
				evt.data.model.setDone(evt.data.task, !evt.data.task.done);
			});

			this.container.append(clonedTemplate);
		}
	}
};

function createTasksListView(config) {
	var view = Object.create(TasksListView);
	apply(config, view);

	if (view.model) {
		view.render();
	}

	view.model.on('change', function(){
		view.render();
	});

	return view;
}