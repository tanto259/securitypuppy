---
layout: page
permalink: /w/enablingexci
permalink_name: /w/enablingexci
image: /assets/img/social/home.png
title: Enabling External CICS Interface Calls
description: My journey into trying to enable EXCI calls on a CICS TS 5.5 instance.
last_modified_at: 2022-10-18T16:30:00+08:00
---

*First published: 18 October 2022*<br>*Last updated: 18 October 2022*

One of the request that we encountered a lot on the COBOL Programming Course is CICS. Everybody wanted to use CICS, but administering the subsystem proved to be a difficult process. 

With CICS, a transaction name is limited to 4 characters. On your shop, you may have a certain naming conventions for those transactions or perhaps not everyone have access to make a new CICS transaction. However, on the system which we are using for the COBOL Programming Course, we have a ton of users. There are more than 10,000 IDs issued for the course, and the number keeps increasing.

Having a way we can enforce CICS transaction naming, and preventing people from stepping on each other is something we need to solve before allowing everyone into the subsystem. However, perhaps there are other ways we can let users have a taste of CICS.

### External CICS Interface

One of the way that came to my attention recently is through something called the External CICS Interface (EXCI). It is a set of APIs which enable non-CICS application running on z/OS to call a CICS program in a region. So theoretically speaking, you should be able to call a CICS program from an ordinary batch COBOL program.

Now, it's time to try to see how we can enable it and try it out. For the COBOL Programming Course, we are using a single region CICS system, so we have no need to configure any kind of dynamic routing for CICSPlex. So static it is!

### Configuring EXCI for Static Routing

The [IBM Documentation](https://www.ibm.com/docs/en/cics-ts/5.5?topic=exci-setting-up-static-routing){:rel="noopener noreferrer"} provides a short list of procedure to configure EXCI for static routing. But if, like me, you are starting from scratch and you don't have a lot of CICS knowledge, there are a few missing items.

1. Look into the sample group DFH$EXCI. You will find a couple of connections and sessions items, along with some sample programs and transactions. What matters here are the connections and sessions: EXCG for generic and EXCS for specific. Since we are aiming to allow for sessions to be shared between multiple users, we will be installing the generic connection here. 

2. Copy the EXCG connection and session to a new group and install the group. You may also want to add the group to the start-up list so that it persists through any region restart. 

3. Do ensure that ISC are included in the system initalization parameter for your CICS region. Then you will either need to start IRC, either via CEMT or via the system initalization parameter.

4. Check that the EXCI options table, DFHXCOPT, are assembled in the SDFHEXCI load library. There might already be a default entry on the load library.

5. Compile and assemble your COBOL program and ensure that the part of the JCL that runs the program have the CICS region and user ID specified, along with the SDFHEXCI load library concatenated on the STEPLIB.

For the COBOL client program, I utilized [EXEC CICS LINK](https://www.ibm.com/docs/en/cics-ts/5.5?topic=interface-exec-cics-link-command-exci){:rel="noopener noreferrer"}, passing data via a communication area. Make sure that when control is transferred to the CICS program, it will not encounter any of the [prohibited API commands](https://www.ibm.com/docs/en/cics-ts/5.5?topic=link-exception-conditions-command){:rel="noopener noreferrer"}, which include RECEIVE and SEND.

After completing all above, the program should be able to call a CICS program that is installed on your CICS region. Hopefully, we can have something CICS-related for the COBOL Programming Course in the future.