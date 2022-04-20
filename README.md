# Altai by Marinarty

Here's my attempt at coding a landing page for tour promotion. It's made in Figma by Marinarty. I wrote more about her in the next section. And here are layout previews in `.png`:
|📱 [Mobile layout](https://raw.githubusercontent.com/eimwe/altai/main/previews/375px.png)|🖥️ [Desktop layout](https://raw.githubusercontent.com/eimwe/altai/main/previews/1440px.png)|
|---|---|

I was honored to take part in this project and had an absolute blast making it.

## About the Web Designer

Marinarty is a skillful Web Designer from France. I've had the privilege of working with her on the same team once. It was her who inspired me to choose a front-end development career path. She has a solid skillset in UX/UI design and website coding. Being a highly motivated and hard-working person, she strives for perfection. It's safe to say her destiny is to be par excellence in all of her endeavors.
You can catch up with her projects here:

[![](https://img.shields.io/badge/Behance-1769ff?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/tsiganoshace6a) [![](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Marinarty)

## Technology stack

- HTML 5
- Dart SASS
- PostCSS
- JavaScript ES6
- JSDoc
- jQuery
- Webpack 5

## Test environment

| Browser         | Version      |
| --------------- | ------------ |
| Google Chrome   | 99.0.4844.51 |
| Mozilla Firefox | 98.0.1       |
| Microsoft Edge  | 99.0.1150.39 |

## Usage instructions

1. Clone the repository
2. Run `npm i` to install dependencies
3. Run one of the following commands:

### Production Build

`npm run build`

### Development Build

`npm run build-dev`

### Development Server

`npm start`

### Switch to localized version in English

`git checkout enLocale`

## Takeaways

During the development, I had to battle procrastination and impostor syndrome at once. Eventually, I learned both of these can be used to push myself forward. For now, I'd like to focus on my breakthroughs and the things I've failed at miserably.

### Bundler

I'm getting used to feeling at home with Webpack. I've found a way to serve a markup inside **index.html**, so I don't have to reload the dev server manually every time the markup gets updated. It's a time saver. However, I should address some things in the next project. First things first, fixing or updating vulnerable packages via npm. I can see new config file settings coming, but it sounds interesting. Secondly, I need to find a way to convert content images into the desired format (for instance, _.webp_). I'm sure there's a package for that somewhere.

### Git

Not a long time ago, I learned something new about git commits. It goes as follows:

> Commit early, commit often

This time I've done what I've taught. I'm just not sure I was doing it right. But there's an improvement, especially in comparison with my former projects. Dealing with _bad_ commits is a whole different animal. I need to level up in all the commands like squash, rebase, etc.

### CSS custom properties

Long live CSS variables! However, these come with a great responsibility when it comes to naming them. I've yet to come up with a good naming convention and am far from adopting an existing one if there're any. It leads to a mess inside `:root` where I usually store the variables. It isn't something I like. Fixing this problem is crucial for the next project.

### BEM

Speaking of naming conventions, I started to comprehend the BEM methodology better. Aid comes from the nested style rules. When the nesting goes further than the 2nd level (excluding pseudo-classes and pseudo-elements), then classes are named wrong. Mixes (two block-level class names for the same entity) are more intricate to get right, but I'm at it.

### HTML `dialog` element

The real news was I don't need to create a `div` nested structure for a modal window anymore. Not all browsers support it at the time being, but there's an excellent polyfill maintained regularly. I found out about it via the mdn reference page, where I learned about the dialog itself. It looks lighter (including the JS portion) and cleaner than the old way of marking up pop-ups.

### Dart Sass

Changing over to Dart Sass wasn't hard when I watched a series of videos on partials by Kevin Powell. Thanks to Kevin, I also use the **7-1 pattern** coined by Kitty to structure sass files in a meaningful way. They encouraged anyone to modify that pattern to the needs of a particular project. I did that and was quite happy with the results. I'm going to use this approach from here on out.

### JavaScript

I love JS nearly as much as I'm scared of it. This dilemma didn't prevent me from moving forward with it. I'm not that good at ES6 features, but I've finally utilized classes for this project. That's a big win for me! Of course, everything went not as I planned. There are four types of a slideshow for this design layout. And a class-based solution suits just perfectly for all of them. And I've failed to create an instance for the third one located at _Our Team_ section. Well, I did. You can look at how it works switching to the `vanillaTeamGallery` branch. I can tell you it's far from being perfect. Instead of figuring out how to make it right, I opted out for the good old jQuery-powered slick slider. It did the job, and I decided to leave it there. Sure, I brought in the whole library to do one tiny job. And it felt like a missed opportunity for me to score at fixing bugs. But I'm not done yet. One day I might revisit it with a proper solution.

## Blueprint for the next project

It's time to remake a cat hotel multipage catalog that has been unattended in one of my repositories for almost a year. I decided to use Vue.js and create a new repository for that one. It'll be fun! I hope to obtain even more experience and stories to tell in that project's respective README.

## Attributions

1. [Marinarty](https://www.behance.net/tsiganoshace6a) for this design layout. Thank you! 😉
2. [Nicolas Gallagher](https://nicolasgallagher.com/) for the _normalize.css_ file that you can [get from this source](https://necolas.github.io/normalize.css/);
3. [Kitty](https://kittygiraudel.com/) for the 7-1 pattern in organizing sass files [described in this article](https://sass-guidelin.es/#architecture);
4. [Turtlefight](https://stackoverflow.com/users/8411406/turtlefight) for an excellent solution on css grid slideshow taken from [their stackoverflow reply](https://stackoverflow.com/a/57529819) licensed by https://creativecommons.org/licenses/by-sa/4.0/. I customized their solution to meet the needs of the galleries in this project;
5. [Temani Afif](https://stackoverflow.com/users/8620333/temani-afif) for a neat approach on using `clip-path` for animation purposes taken from [their stackoverflow reply](https://stackoverflow.com/a/64018355) licensed by https://creativecommons.org/licenses/by-sa/4.0/;
6. [Jay Reeve](https://stackoverflow.com/users/14213594/jay-reeve) for a great solution on telephone number formatting script taken from [their stackoverflow reply](https://stackoverflow.com/a/68822305) licensed by https://creativecommons.org/licenses/by-sa/4.0/. I've added a little tweak to their solution and it works perfectly fine! At least on my machine 🙃;
7. [Rick Stanley](https://stackoverflow.com/users/7443903/rick-stanley) for clarifying the issue with unreachablle css custom variables in `dialog::backdrop` in [this stackoverflow reply](https://stackoverflow.com/a/63322762) licensed by https://creativecommons.org/licenses/by-sa/4.0/;
8. [CBroe](https://stackoverflow.com/users/1427878/cbroe) for reminding me the right way to add/remove event listeners in [this stackoverflow reply](https://stackoverflow.com/a/63281414) licensed by https://creativecommons.org/licenses/by-sa/4.0/;
9. [Louis Hoebregts](https://css-tricks.com/author/louishoebregts/) for the perfect accordeon animation solution described in [their post](https://css-tricks.com/how-to-animate-the-details-element-using-waapi/) on css-tricks.com;
10. All contributors and maintainers of the [dialog-polyfill.js](https://github.com/GoogleChrome/dialog-polyfill);
11. All [jQuery JS Library](https://github.com/jquery/jquery) contributors and maintainers;
12. [Kevin Powell](https://www.kevinpowell.co/) for the inspirational and highly informative pieces of advice on how to make the corners of the Internet just a little bit more awesome.

## Conributing

If you get interested in this project, I'd be glad to see your contributions. Pull requests are welcome!

## License

[MIT](https://github.com/eimwe/soccer/blob/master/LICENSE.md)
