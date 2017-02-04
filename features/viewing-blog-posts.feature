Feature: Viewing posts

    Background:
        Given there are posts:
            | post_title      | post_content              | post_status | post_author |
            | Just my article | The content of my article | publish     | admin       |
            | My draft        | This is just a draft      | draft       | admin       |

    Scenario: List my blog posts
        Given I am on the homepage
        Then I should see "Just my article"
        And I should not see "My draft"

    Scenario: Read a blog post
        Given I am on the homepage
        When I follow "Just my article"
        Then I should see "Just my article"
        And I should see "The content of my article"
