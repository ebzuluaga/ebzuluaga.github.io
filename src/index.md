---
title: Home
no_title: yes
showcase_links:
    - url: flaskr.bzuluaga.com
      desc: Tutorial app from Flask's official documentation
    - url: /blog
      desc: My personal blog (currently not available)
    - url: https://github.com/oldarkdesu/dots
      desc: "My personal <em>dotfiles</em>"
    - url: https://ergokeebs.vercel.app/
      desc: ErgoKeebs. A small e-commerce site
    - url: https://github.com/estebanbedoyazuluaga/mui-takehome
      desc: A small react app using MUI's Datagrid (from a nextjs template project)
    - url: https://github.com/estebanbedoyazuluaga/ttt-test
      desc: Tic tac toe (from React's tutorial)
    - url: https://github.com/estebanbedoyazuluaga/yelp-camp
      desc: Yelp Camp (from a course)
    - url: https://github.com/estebanbedoyazuluaga/mvc-demo
      desc: Simple toy app for showing the MVC design pattern
    - url: https://github.com/ebzuluaga/ebzuluaga.github.io
      desc: This very site
---

# Hi, I'm Esteban

I'm a Systems <small>(and telecommunications)</small> Engineer , and an aspiring software developer/sysadmin.
(This site is under construction...)

## Socials

- e-mail: [esteban@bzuluaga.com](mailto://esteban@bzuluaga.com)
- GitHub: [ebzuluaga](https://github.com/ebzuluaga)
- LinkedIn: [ebzuluaga](https://www.linkedin.com/in/ebzuluaga/)

## Some stuff I've done (mostly for university):

<ul>
	{%- for i in showcase_links -%}
	<li><a href="{{ i.url }}">{{ i.desc | safe }}</a></li>
	{%- endfor -%}
</ul>
