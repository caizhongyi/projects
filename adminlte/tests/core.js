module("Basics");
test("module", function () {
    angular.module('test').run(function () {
        equal(t(false), false, 'no true');
    })
})




