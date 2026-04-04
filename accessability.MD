Fixes by PageSpeedInsights: 

1. Names and labels

Select elements do not have associated label elements.
Form elements without effective labels can create frustrating experiences for screen reader users. Learn more about the select element.
Failing Elements
EN ZH DE FR VI PT ES JA
<select class="lang-select" onchange="if(this.value) location.href = this.value;">

2. Contrast

Background and foreground colors do not have a sufficient contrast ratio.
Low-contrast text is difficult or impossible for many users to read. Learn how to provide sufficient color contrast.
Failing Elements

GOOD
<span>

AI FOR NATURE. TECH FOR GOOD. We are a non-profit dedicated to software develo…
<div class="hero-box">

3. Best practices

Document does not have a main landmark.
One main landmark helps screen reader users navigate a web page. Learn more about landmarks.
Failing Elements
html
<html lang="en">

4. Best practices.

Identical links have the same purpose.
Links with the same destination should have the same description, to help users understand the link's purpose and decide whether to follow it. Learn more about identical links.Unscored
Failing Elements
SEE MORE →
<a href="hub" class="btn-link">
SEE MORE →
<a href="verse" class="btn-link">