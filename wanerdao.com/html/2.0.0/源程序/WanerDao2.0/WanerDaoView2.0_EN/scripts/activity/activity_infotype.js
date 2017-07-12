$(
    function () {
        $(':input[name="info_type"]').click(function () {
            if ($(this).attr("id") === "listStyle") {
                window.location.href = "activity_create.aspx" + location.search;
            }
            else {
                window.location.href = "activity_create_step.aspx" + location.search;
            }
        });
    }
);