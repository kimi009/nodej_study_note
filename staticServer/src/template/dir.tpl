<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>测试{{title}}</title>
</head>
<body>
  {{#each files}}
    <a href="{{../dir}}/{{this}}">{{this}}</a></br>
  {{/each}}
</body>
</html>