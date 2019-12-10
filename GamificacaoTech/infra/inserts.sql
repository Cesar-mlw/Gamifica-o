html {
}

body{
cursor: pointer
}

h1,h2,h3,h4,h5,h6 {
	text-shadow: none;
}

.back-top {
	z-index: -9999;
}

.sobre-wrapper {
	display: flex;
}

.site-branding {
}

.menu-toggle {
	padding: 0;
	top: 5px;
	box-sizing: border-box;
	position: relative;
	font-size: 0;
	background: none;
	border-style: solid;
	border-width: 0 0 5px 5px;
	border-color: #00a6af;
	content: '';
	display: inline-block;
	height: 20px;
	width: 20px;
	transform: rotate(-225deg);
}

.menu-toggle:hover, .menu-toggle:focus, .menu-toggle:active {
	background: none;
	border-color: #2c313f;
}

.menu-toggle.toggled-on {
	transform: rotate(-45deg);
	top: -5px;
}

body {
	overflow-y: auto;
}

.hentry-wrapper {
	max-width: 100%;
	width: 100%;
}

.entry-content > * {
	margin-left: auto;
	margin-right: auto;
	max-width: 900px;
	max-width: 70rem;
	width: 90%;
	width: calc(100% - 3em);
}

.wp-block-button__link {
	margin: 0;
	width: auto;
}

.entry-content .googlemaps {
	margin: 0;
	max-width: 100%;
	width: 100%;
	line-height: 0;
}

#content {
	padding-top: 75px;
}

@media screen and (max-width: 896px) {
	.sobre-wrapper {
		flex-direction: column;
	}
	
	.site-header-wrapper {
		margin-top: .75em;
	}
	
	.sticky-header .site-header {
		position: fixed;
		-webkit-transition: all .25s ease-in-out;
		-moz-transition: all .25s ease-in-out;
		transition: all .25s ease-in-out;
		z-index: 9999;
	}
	
	.scrolling .site-header {
		padding-bottom: .75em;
	}
	
	#content {
		padding-top: 65px;
	}
	
	.menu-item {
		text-align: center;
	}
	
	.menu-item:hover {
		background: #00a6af;
	}
	
	.menu-item:hover a {
		color: #fff;
	}
}

.back-top {
	display: none;
}

.confit-address {
}

#colophon {
	background: #172137;
	border: none;
	padding: 12px 0;
	display: none;
}

.site-footer-wrapper {
	display: flex;
	justify-content: center;
}

.site-info {
/*display: none;*/
	display: flex;
	justify-content: center;
	margin: auto;
}

.site-info svg {
	color: rgba(255,255,255,0.8);
}

#actionbar {
	display: none;
}

h1, h2, h3, h4, h5, h6 {
	outline: none;
}

.menu-anchor {
	padding-top: 140px;
	margin-top: -170px;
}

.widget-footer-area, .widget-footer-bottom-area, .column-1 {
	background-color: #2B354B;
}

.footer-content-wrapper {
}

.footer-group {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.footer-content-item {
	display: flex;
	padding: 0 30px;
	flex-direction: column;
}

.footer-content-item p {
	color: #fff;
	margin: 0;
	padding-bottom: 10px;
	margin-bottom: 14px;
	border-bottom: 2px solid rgba(255,255,255,.15);
}

.horarios-container {
	display: flex;
	flex-direction: column;
	color: rgba(255,255,255,0.8);
}

.horarios-item {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 12px 0;
	border-bottom: 1px solid rgba(255,255,255,0.2);
}

.horarios-item-dia {
	font-size: 12px;
	padding-right: 12px;
}

.horarios-item-hora {
	font-size: 12px;
	padding-left: 12px;
}

.item-final {
	border: none;
}

.footer-content-item {
	padding: 0;
}

.googlemaps iframe {
	width: 100%;
	max-width: 100%;
	margin: 0;
}

#menu-social li:hover, #menu-social li:focus {
	background: none;
}

@media screen and (max-width: 926px) {
	.footer-group {
		flex-direction: column;
	}
	
	.footer-content-item {
		padding: 12px 0;
	}
}

.bo-info-wrapper {
	display: flex;
	width: 100%;
	max-width: 100%;
	flex-direction: column;
}

.bo-info-wrapper-2 {
	display: flex;
	width: 85%;
	max-width: 100%;
	flex-direction: column;
}

.bo-row {
	display: flex;
	width: 100%;
	flex-direction: column;
	background: #f2f2f2;
}

.bo-item {
	width: 100%;
	display: flex;
	align-items: center;
	padding: 12px 25px;
}

.bo-item-vert {
	flex-direction: column;
}

.bo-item img {
	width: 45px;
	height: 45px;
	padding: 10px;
	box-shadow: inset 0 0 0 1px rgba(0,0,0,.08);
}

.bo-item-circle-container {
	border-radius: 50%;
	padding: 10px;
	border: 5px solid #00a6af;
}

.bo-item-circle {
	width: 100px;
	height: 100px;
	padding: 10px;
	box-shadow: inset 0 0 0 1px rgba(0,0,0,.08);
	background: #00a6af;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}

.bo-item-vert img {
	box-shadow: none;
	padding: 0;
	position: relative;
	margin: auto;
	height: 75px;
    width: auto;
	max-width: none;
}

.bo-item-text {
	display: flex;
	flex-direction: column;
	margin-left: 12px;
}

.bo-item-text-vert {
	display: flex;
	flex-direction: column;
	margin-top: 22px;
}

.bo-item-text-vert * {
	margin: 0;
	color: #2c313f;
}

.bo-item-text-vert h4 {
	font-size: 18px;
}

.bo-item-text-vert p {
	font-size: 14px;
}

.bo-item-text * {
	margin: 0;
	color: #2c313f;
}

.bo-item-text h4 {
	font-size: 16px;
}

.bo-item-text p {
	font-size: 14px;
}

.bo-row-1 {
	padding-top: 12px;
}

.bo-row-2 {
	padding-bottom: 12px;
}

#post-621, #post-150 {
	padding: 0;
}

.grunion-field-wrap input {
	padding: 15px 20px;
	border: 1px solid #e5e5e5;
}

.grunion-field-date-wrap input {
	border: none;
}

.date {
	border: 0;
	border-radius: 5em;
	color: #fff;
	font-size: .8125rem;
	letter-spacing: .0625em;
	line-height: 1.3847;
	padding: .5625rem 1.5em;
	text-transform: uppercase;
	text-align: center;
	width: 100%;
	cursor: pointer;
	margin: auto;
	font-weight: 600;
	transition: background-color .3s ease-in-out;
}

.has-blue-background-color, .has-blue-background-color:hover, .has-blue-background-color:focus, .has-blue-background-color:active, .has-blue-background-color:visited,button, input[type=button], input[type=reset], input[type=submit],.date {
	background-color: #00a6af;
	transition: background-color .3s ease-in-out;
}

.grunion-field-name-wrap label, .grunion-field-email-wrap label, .grunion-field-telephone-wrap label {
	opacity: 0;
	height: 0;
	margin: 0;
	padding: 0;
}

.grunion-field-date-wrap label {
	opacity: 1;
	height: 100%;
}

.date:hover {
	background: #2c313f;
}

.grunion-field-date-wrap input {
	height: 0;
	width: 0;
	padding: 0;
}

.grunion-field-label span {
	display: none;
}

.custom-logo {
	height: 4em;
	max-height: 65px;
	width: auto;
}

.wp-custom-logo .site-title {
	margin-top: 0;
}

.site-branding {
	margin-top: 0;
}

.site-title a {
	color: #3e69dc;
	font-size: 0;
}

.site-title {
	height: 0;
}

.pushbutton-wide {
	display: block;
	margin: auto;
	transition: background-color .3s ease-in-out;
}

input[type=text]:focus, input[type=email]:focus, input[type=url]:focus, input[type=password]:focus, input[type=search]:focus, input[type=number]:focus, input[type=tel]:focus, input[type=range]:focus, input[type=date]:focus, input[type=month]:focus, input[type=week]:focus, input[type=time]:focus, input[type=datetime]:focus, input[type=datetime-local]:focus, input[type=color]:focus, select:focus, textarea:focus {
	outline: 2px solid #00a6af;
}

#content {
	padding-top: 100px;
}

@media only screen and (min-width: 600px) {
	.date {
		width: 50%;
	}
}

@media screen and (min-width: 896px) {
	.date {
		font-size: 1rem;
	}
	
	.site-branding {
		margin-top: 1.5em;
	}
	
	.custom-logo {
		max-height: 95px;
	}
	
	.sobre-wrapper p {
		width: 70%;
		margin-right: 20px;
	}
	
	.menu-toggle {
		display: none;
	}
	
	.bo-row {
		flex-direction: row;
	}
	
	.equipe-row {
		flex-direction: row;
	}
	
	.bo-item {
		padding: 12px 25px;
	}
	
	.bo-row-1 {
		padding-top: 12px;
	}
	
	.bo-row-2 {
		padding-bottom: 12px;
	}
	
	.main-navigation, .main-navigation a:hover, .main-navigation a:focus {
		color: #00a6af;
	}
	
	.extra-treatments-wrapper {
		flex-direction: row;
	}
}

.main-navigation {
	color: #00a6af;
}

.extra-treatments-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.extra-treatments-item {
	display: flex;
	flex-direction: column;
	padding: 125px 0;
	align-items: center;
	height: 360px;
	width: 100%;
	transition: padding 105ms linear;
	position: relative;
}

.extra-treatments-item:hover, .extra-treatments-item:active, .extra-treatments-item:focus {
	padding: 60px 0;
	cursor: pointer;
}

.treatment-overlay {
	height: 360px;
	position: absolute;
	width: 100%;
	top: 0;
	background-color: rgba(43,53,75,0.6);
	z-index: 1;
}

.extra-treatments-spacer {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 2;
    padding: 0 30px;
    position: relative;
    top: 0;
}

.extra-treatments-main {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 10px;
}

#extra-treatment-pediatria {
	background-image: url('https://beozzoodontologiacom.files.wordpress.com/2019/10/moses-vega-_yfoaprxd4i-unsplash.jpg');
	background-size: 210%;
	background-position: 62% 50%;
	transition: all ease .5s;
}

#extra-treatment-pediatria:hover {
	background-size: 220%;
}

#extra-treatment-special {
	background-image: url('https://beozzoodontologiacom.files.wordpress.com/2019/10/special-needs.jpg');
	background-size: 200%;
	background-position: 75% 50%;
	padding-bottom: 105px;
	transition: all ease .5s;
}

#extra-treatment-special:hover {
	background-size: 220%;
	padding-bottom: 0;
	padding-top: 40px;
}

#extra-treatment-day {
	background-image: url('https://beozzoodontologiacom.files.wordpress.com/2019/10/eric-rothermel-foko4dpxamq-unsplash.jpg');
	background-size: 175%;
	background-position: 50% 50%;
	transition: all ease .5s;
}

#extra-treatment-day:hover {
	background-size: 195%;
}

#extra-treatment-cirurgia {
	background-image: url('https://beozzoodontologiacom.files.wordpress.com/2019/10/michael-browning-d0ov97td-xm-unsplash.jpg');
	background-size: 200%;
	background-position: center;
	transition: all ease .5s;
}

#extra-treatment-cirurgia:hover {
	background-size: 220%;
}

.treatment-icon {
	width: 75px;
	height: 75px;
	background-size: 100%;
}

#extra-treatment-pediatria .treatment-icon {
	background-image: url('https://beozzoodontologiacom.files.wordpress.com/2019/10/kid.png');
}

#extra-treatment-special .treatment-icon {
	background-image: url('https://beozzoodontologiacom.files.wordpress.com/2019/10/vip.png');
}

#extra-treatment-day .treatment-icon {
	background-image: url('https://beozzoodontologiacom.files.wordpress.com/2019/10/day.png');
}

#extra-treatment-cirurgia .treatment-icon {
	background-image: url('https://beozzoodontologiacom.files.wordpress.com/2019/10/surgery.png');
}

.extra-treatments-main h4 {
	color: #fff;
	margin-bottom: 4px;
}

.extra-treatments-spacer h6 {
	color: #fff;
	font-size: 14px;
}

#extra-treatment-special h4 {
	height: 60px;
}

.equipe-wrapper {
	display: flex;
	flex-direction: column;
	margin-top: 30px;
}

.equipe-row {
	display: flex;
	flex-direction: column;
	align-items: start;
}

.equipe-item {
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	transition: all 200ms ease;
	margin: 25px;
	width: 70%;
}

.ei-header {
    display: flex;
    margin: auto;
    margin-bottom: -20px;
	z-index:1;
}

.ei-photo-wrapper {
}

.ei-photo {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	background-color: #00a6af;
	border: 5px solid white;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,.25);
}

.ei-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	padding: 8%;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,.25);
}

.ei-nome {
	text-align: center;
	font-size: 20px;
	color: #2C313F;
}

.ei-info {
	text-align: center;
	transition: all 200ms ease;
	max-height: 0;
	overflow: hidden;
}

.ei-info-item {
	margin: 10px 0;
	font-size: 14px;
}

.info-arrow {
	font-size: 28px;
	text-align: center;
	position: relative;
	height: 0;
	transform: scaleY(0.5);
	color: #2C313F;
	top: 5px;
}

.ei-info-item:after, .ei-info-item:before {
	width: 100px;
	height: 5px;
	background: red;
}

.equipe-wrapper:hover .equipe-row > .equipe-item:not(:hover) {
	opacity: 50%;
}

.equipe-wrapper:hover .equipe-row .equipe-item:hover > .ei-content:hover .ei-info {
	max-height: 1000px;
}

.equipe-wrapper:hover .equipe-row .equipe-item:hover > .ei-content:hover .info-arrow {
	transform: scaleY(0);
}

@media screen and (min-width: 1190px) {
	.bo-info-wrapper {
		flex-direction: row;
	}
	
	.bo-info-wrapper-2 {
		flex-direction: row;
	}
	
	.bo-row-1 {
		padding-top: 0;
	}
	
	.bo-row-2 {
		padding-bottom: 0;
	}
	
	.bo-row {
		padding: 12px 0;
	}
}

@media screen and (min-width: 896px) {
	.equipe-row {
		flex-direction: row;
	}
	
	.equipe-item {
		width: 50%;
	}
	
	.ei-photo {
		width: 200px;
		height: 200px;
	}
}

@media only screen and (min-width: 1245px) {
	.extra-treatments-wrapper {
		flex-direction: row;
	}
	
	.extra-treatments-spacer {
		padding: 0 10px;
	}
	
	.extra-treatments-item {
		width: 25%;
	}
	
	#extra-treatment-special h4 {
		height: auto;
	}
}