module.exports = (temp, post) => {
  // use regular expression to replace all of them not just one
  let output = temp.replace(/{{title}}/g, post.title);
  output = output.replace(/{{snippet}}/g, post.snippet);
  output = output.replace(/{{content}}/g, post.content);
  output = output.replace(/{{img_url}}/g, post.img_url);
  output = output.replace(/{{id}}/g, post.id);
  return output;
};