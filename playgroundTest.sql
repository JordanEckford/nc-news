\c nc_news_test

SELECT * FROM comments;
SELECT * FROM articles;
SELECT * FROM users;
SELECT * FROM topics;


-- SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count FROM articles
-- FULL OUTER JOIN comments
-- ON comments.article_id = articles.article_id
-- GROUP BY articles.article_id
-- ORDER BY articles.created_at DESC;

SELECT username FROM users
WHERE username = 'bananaman';