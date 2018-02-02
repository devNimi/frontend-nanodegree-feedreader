/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against our application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* test suite named "The menu" */
    describe('The Menu', function() {
        /* test that ensures the menu element is
         * hidden by default.
         */
        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility when the menu icon is clicked', function() {
            // https://api.jquery.com/click/
            // .click() executes immedietly
            $(".menu-icon-link").click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $(".menu-icon-link").click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is alteast one .entry element within the .feed container', function(done) {
            var feedContainer = $('.feed');
            var entryElements = feedContainer.children();
            expect(entryElements.length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var initialFeedContent;

        beforeEach(function(done) {
            loadFeed(1, done);
            // the below like gets executed once loadFeed(1, done) is finished
            initialFeedContent = $('.feed').html();
        });

        it('content actually changes when new feed is loaded', function(done) {
            loadFeed(0);
            var newFeed = $('.feed').html();
            expect(newFeed).not.toEqual(initialFeedContent);
            done();
        });
    });

}());
