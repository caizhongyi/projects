$(
    function () {
        $(':input[name="info_type"]').click(function () {
            if ($(this).attr("id") === "listStyle") {
                window.location.href = "Activity_create.aspx" + location.search;
            }
            else {
                window.location.href = "Activity_create_step.aspx" + location.search;
            }
        });
    }
);