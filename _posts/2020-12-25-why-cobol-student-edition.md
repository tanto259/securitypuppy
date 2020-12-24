---
title: "Why COBOL? Student Edition"
excerpt: "Are you a student? Here's why there are nothing wrong with studying COBOL today."
tags:
  - COBOL
  - Enterprise Computing
last_modified_at: 2020-12-25T00:00:00+08:00
---

Let's talk about COBOL! A programming language which, despite being 61 years old, still powers many of the world's business and finance systems. It was designed to be a standard business-oriented computing language, and it did just that.

## Enterprise Business Applications

The reality is many enterprise business applications are large and complex, involving many rotating parts and thousands of lines of code. Back in 2017, <a href="https://fingfx.thomsonreuters.com/gfx/rngs/USA-BANKS-COBOL/010040KH18J/index.html" rel="noopener" target="_blank">Reuters</a> approximates that there are still 220 billion lines of COBOL still in use. Furthermore, according to <a href="https://www.computerworld.com/article/2504568/the-cobol-brain-drain.html" rel="noopener" target="_blank">ComputerWorld</a>, even a single company, the Bank of New York Mellon have over 343 million lines of COBOL back in 2012. And they are still hiring COBOL programmers today.

As time went by, those applications should also evolve. From in the 1960s where memory and storage are extremely limited till the current time when DevOps is rising. Who knows what tomorrow holds? But one thing for sure, the applications must be able to leverage new developments in IT.

One more very important point is that these applications are often time, if not always, critical. They must be stable with high durability, especially around holidays and peak hours where a high rate of transactions occurs over a short period, where downtime of any period will result in a loss of profit.

## How COBOL Fits Into the Picture?

Let's take a look at a very simple COBOL code which reads hard-coded values, do computation and print out the values nicely.

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. FAVS.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  FAV-REC.
           05  ARTIST-NAME              PIC X(30).
           05  COST.
                10  TOTAL-COST          PIC 9(04)V99.
                10  CD-COST             PIC 9(03)V99.
                10  SHIPPING-COST       PIC 9(02)V99.
                10  TAX                 PIC 9(02)V99.
       PROCEDURE DIVISION.
           MOVE "Jazzy Bondz"       TO ARTIST-NAME.
           MOVE 23.50               TO CD-COST.
           MOVE 8.50                TO SHIPPING-COST.
           MOVE 0.10                TO TAX.
           COMPUTE TOTAL-COST =
                CD-COST + (TAX * CD-COST) + SHIPPING-COST.
           DISPLAY "Group Name: " ARTIST-NAME.
           DISPLAY "--------------------".
           DISPLAY "CD Cost: " CD-COST.
           DISPLAY "Shipping Cost: " SHIPPING-COST.
           DISPLAY "Tax Rate: " TAX.
           DISPLAY "--------------------".
           DISPLAY "Total Cost: " TOTAL-COST.
           GOBACK.
```

One thing that should be obvious to you upon seeing the code is that COBOL is self-documenting. Its syntax and semantics are in English and readable even to people with no programming knowledge. That would enable auditors, maintainer and support personnel to perform their task efficiently.

Another aspect is that COBOL is portable, universal and open. It has an open standard and applications can be developed and even ported to almost every operating system in operation. Furthermore, it can integrate with many other databases and other programming languages.

There are also applications written a long time ago which are still in production, showing us that COBOL is mature and reliable. Often time when something went wrong, the fault is not with the COBOL application. Lastly, it is also optimized in high volume data processing down to the assembly instructions level.

## Studying COBOL as a Student

My first encounter into COBOL was through the <a href="https://github.com/openmainframeproject/cobol-programming-course" rel="noopener" target="_blank">COBOL Programming Course</a> held by the Open Mainframe Project. The course taught me the basics of COBOL and how to code my first COBOL program. They also provide you with a free lab system using a real IBM Z machine!

But it wasn't until I took another course held by IBMer Jonathan Sayles that I realize how massive COBOL programs can be. He shows us examples of COBOL applications with more than 2000 lines and provides insights into how complex an enterprise business application can be.

There are also other avenues of learning, such as the <a href="https://developer.ibm.com/series/cobol-fridays-webinar-videos/" rel="noopener" target="_blank">COBOL Fridays webinar series</a> which has recently concluded with a panel discussion with students and academia about educating the next generation of COBOL programmers.

The community is also a very important aspect of my study and I found that the mainframe community has been helpful and welcoming to new people. It's one of the very few communities where I feel welcomed. So, do network with us on the <a href="https://slack.openmainframeproject.org/" rel="noopener" target="_blank">Open Mainframe Project's Slack workspace</a> and feel free to ask questions on the #COBOL-Programming-Course channel there.

## The Next Generation of COBOLers

I recently took part in the panel discussion for COBOL Fridays' final episode where my friend Emmanuel and I talked about our learning journey in Enterprise Computing while also learning from academic institutions about their part in teaching the next generation. I would encourage you to watch the panel discussion, where I learned many new things about COBOL and hopefully, you will too.

<div class="embed-responsive embed-responsive-16by9">
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/wBFEZE_09Sw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

In the end, COBOL is just another language. It wouldn't hurt you to learn more about this iconic language which has been around for decades and help power the world's economy.

Consider this as your opportunity to get a hands-on experience on the massive scale of enterprise business application and learn a broader skill which is marketable.