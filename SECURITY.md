# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| 1.x | Yes |
| Upstream releases | Maintained by their upstream owner |

## Parser security boundary

The parser rejects over-limit input before parsing. The default limit is 2,000
characters and preserves the upstream mitigation for CVE-2021-23490. Raising
the limit is an application decision; the parser uses bounded linear scans and
does not construct regular expressions from input.

Keys named `__proto__`, `prototype`, or `constructor` are ignored when they
come from query parameters, Link extension parameters, or relation tokens.

## Reporting a vulnerability

Use GitHub private vulnerability reporting for this repository. Include the
package and runtime versions, exact header or minimized generator, options,
expected impact, measured resource use, and known workaround. Do not disclose
an exploitable input in a public issue before a coordinated fix is available.

We will acknowledge a complete report within five business days, investigate
privately, and coordinate disclosure and credit.

