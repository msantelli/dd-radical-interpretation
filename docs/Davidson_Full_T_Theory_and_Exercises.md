# Full Mini T-Theory, Exercises, and Compositionality Schemas

## 1. Full Worked-Out Mini T-Theory (with Recursion, Names, Predicates, Quantifiers)

This document provides a complete miniature T-theory for a first‑order
fragment with:\
- constants (names): `k` (Kurt), `m` (Mary)\
- one-place predicates: `R(x)` ("x is a rabbit"), `S(x)` ("x is small")\
- one two-place predicate: `L(x,y)` ("x loves y")\
- logical symbols: `¬`, `∧`, `∨`, `→`, `∀`, `∃`, parentheses

We include formal syntax, semantics, T‑schemata, and fully worked
derivations.

------------------------------------------------------------------------

## 1.1 Syntax (Informal)

**Atomic formulas** - `R(k)`, `S(m)`, `L(k,m)` etc.

**WFF formation rules (recursive)**\
If `φ` is a wff:\
- `¬φ` is a wff.\
If `φ` and `ψ` are wffs:\
- `(φ ∧ ψ)`, `(φ ∨ ψ)`, `(φ → ψ)` are wffs.\
If `φ(x)` has free variable `x`:\
- `∀x φ(x)` and `∃x φ(x)` are wffs.

**Sentences** = wffs with no free variables.

------------------------------------------------------------------------

## 1.2 Semantics: Models and Satisfaction

A **model** is a pair ( M = `\langle `{=tex}D, I angle ) where: - ( D )
is a nonempty domain. - ( I ) interprets constants and predicates: -
constants: `I(k) ∈ D`, `I(m) ∈ D` - predicates: one-place: `I(R) ⊆ D`,
`I(S) ⊆ D`; two-place: `I(L) ⊆ D × D`.

Truth for sentences is defined recursively:

1.  **Atomic**
    -   ( M `\models `{=tex}R(a) ) iff ( I(a) ∈ I(R) )\
    -   ( M `\models `{=tex}L(a,b) ) iff ( (I(a), I(b)) ∈ I(L) )
2.  **Negation**
    -   ( M `\models `{=tex}¬φ ) iff not ( M `\models `{=tex}φ )
3.  **Conjunction**
    -   ( M `\models `{=tex}φ ∧ ψ ) iff ( M `\models `{=tex}φ ) and ( M
        `\models `{=tex}ψ )
4.  **Disjunction, Implication**
    -   Standard truth conditions.
5.  **Quantifiers**
    -   ( M `\models `{=tex}∀x φ(x) ) iff for every ( d ∈ D ), ( M\[x
        `\mapsto `{=tex}d\] `\models `{=tex}φ(x) )
    -   ( M `\models `{=tex}∃x φ(x) ) iff some ( d ∈ D ) satisfies (
        M\[x `\mapsto `{=tex}d\] `\models `{=tex}φ(x) )

------------------------------------------------------------------------

## 1.3 T-Theory: Schematic T-Sentences (Davidson/Tarski)

A T-theory consists of all T-sentences of the form:

> **T(⌜φ⌝):** `'⌜φ⌝' is true iff φ`

constructed recursively.

### **Atomic T-Sentences**

    T-ATOMIC-1: 'R(t)' is true  iff  I(t) ∈ I(R)
    T-ATOMIC-2: 'S(t)' is true  iff  I(t) ∈ I(S)
    T-ATOMIC-3: 'L(t1, t2)' is true  iff  (I(t1), I(t2)) ∈ I(L)

### **Negation**

    T-NOT: '¬φ' is true  iff  not ('φ' is true).

### **Conjunction**

    T-AND: 'φ ∧ ψ' is true  iff  'φ' is true  and  'ψ' is true.

### **Disjunction**

    T-OR: 'φ ∨ ψ' is true  iff  'φ' is true  or  'ψ' is true.

### **Implication**

    T-IMP: 'φ → ψ' is true  iff  if 'φ' is true then 'ψ' is true.

### **Quantifiers**

Let `⌜φ(x)⌝` be a formula schema in which `x` is free.

    T-FORALL: '∀x φ(x)' is true  iff  for every d ∈ D, 'φ(d/x)' is true.

    T-EXISTS: '∃x φ(x)' is true  iff  there exists d ∈ D such that 'φ(d/x)' is true.

------------------------------------------------------------------------

## 1.4 Worked Derivations (Examples)

Assume model ( M = `\langle `{=tex}D, Iangle ): - ( D = {a, b} ) -
`I(k) = a`, `I(m) = b` - `I(R) = {a}` - `I(S) = {b}` - `I(L) = {(a, b)}`

### **A) Atomic Derivation**

`'R(k)' is true` iff `I(k) ∈ I(R)` iff `a ∈ {a}` → **true**.

### **B) Negation**

`'¬R(k)' is true` iff not `'R(k)' is true` → **false**.

### **C) Conjunction**

Consider `'R(k) ∧ L(k,m)'`.

-   `'R(k)'` true\
-   `'L(k,m)'` true because `(a,b) ∈ I(L)`

Thus `'R(k) ∧ L(k,m)'` is **true**.

### **D) Universal Quantifier**

Sentence: `∀x (R(x) → ∃y L(x,y))`

Apply T-FORALL:

`'∀x (R(x) → ∃y L(x,y))'` is true iff for every `d ∈ D`,
`'R(d) → ∃y L(d,y)'` true.

-   For `d = a`: `R(a)` true; `∃y L(a,y)` true (witness `b`).\
-   For `d = b`: `R(b)` false → implication true.

Hence universal sentence is **true**.

### **E) Existential Quantifier**

Sentence: `∃x R(x)`\
True iff some `d ∈ D` satisfies `R(d)` → `d = a`.

------------------------------------------------------------------------

# 2. Interactive Exercise Set for Students

(With answers included --- remove answers if needed for assignments)

------------------------------------------------------------------------

## **Exercise 1 --- Atomic**

**Q1.** Given `I(k)=a`, `I(R)={a}`, provide the T-sentence for `R(k)`
and evaluate.

**A1.**\
`'R(k)' is true iff a ∈ {a}` → **true**.

------------------------------------------------------------------------

## **Exercise 2 --- Negation & Conjunction**

**Q2.** Evaluate `'¬(R(k) ∧ S(k))'` given `I(R)={a}`, `I(S)={b}`,
`I(k)=a`.

**A2.**\
`R(k)` true, `S(k)` false → conjunction false → negation **true**.

------------------------------------------------------------------------

## **Exercise 3 --- Universal Quantifier**

**Q3.** Give T-sentence for `∀x R(x)`.

**A3.**\
`'∀x R(x)' is true iff for every d ∈ D, 'R(d)' is true.`\
True iff `I(R) = D`.

------------------------------------------------------------------------

## **Exercise 4 --- Existential Quantifier**

**Q4.** Given `D={a,b}`, `I(R)={b}`, evaluate `'∃x R(x)'`.

**A4.**\
Witness = `b`. `'∃x R(x)'` is **true**.

------------------------------------------------------------------------

## **Exercise 5 --- Compositional Derivation**

**Q5.** If `'P'` is true iff p, and `'Q'` true iff q, derive `'P ∧ Q'`.

**A5.**\
`'P ∧ Q'` is true iff p and q.\
`'¬(P ∧ Q)'` true iff not (p and q).

------------------------------------------------------------------------

## **Exercise 6 --- Build a Tiny T-Theory (Project)**

**Q6.** Build the atomic T-theory for constants `k,m` and predicates
`F`, `G`.

**A6.**\
Sample solution included in previous message; omitted here for brevity
of structure.

------------------------------------------------------------------------

## **Exercise 7 --- Radical Interpretation**

**Q7.** Describe how charity and behavioral evidence guide the
interpreter.

**A7.**\
Interpreter correlates utterances with circumstances, picks truth
conditions that make the speaker mostly rational and mostly right.

------------------------------------------------------------------------

## **Exercise 8 --- Indeterminacy**

**Q8.** Give an example of two T-theories yielding same observed truths
but diverging elsewhere.

**A8.**\
Any systematically permuted interpretation (C/F-style indeterminacy)
that preserves truth of all observed utterances.

------------------------------------------------------------------------

# 3. Visual Schemas for Compositionality

------------------------------------------------------------------------

## **3.1 ASCII Compositional Flow**

    [Utterance tokens] → ["R(k) ∧ L(k,m)"]
                         |
                    [Parsing]
                         |
                [Syntax tree built]
                         |
           [Apply T-schemas recursively]
             - atomic clauses for R(k), L(k,m)
             - conjunction clause
                         |
               [Compute truth value]

------------------------------------------------------------------------

## **3.2 Mermaid Diagram (for VS Code / GitHub / Obsidian)**

``` mermaid
flowchart TD
  U[Utterance: "R(k) ∧ L(k,m)"]
  Lex[Lexicon: 'R','L','k','m']
  Parse[Parser → Syntax Tree]
  Tree["Tree: (R(k) ∧ L(k,m))"]
  Tclauses["Apply T-schemata
(atomic, neg, ∧, ∀, ∃)"]
  Parts["Evaluate parts:
'R(k)', 'L(k,m)'"]
  Atomic1["'R(k)' ↔ R(I(k))"]
  Atomic2["'L(k,m)' ↔ (I(k),I(m)) ∈ I(L)"]
  Conj["'R(k) ∧ L(k,m)' ↔ 'R(k)' & 'L(k,m)'"]
  Result["Truth value: True/False"]

  U --> Parse
  Lex --> Parse
  Parse --> Tree
  Tree --> Tclauses
  Tclauses --> Parts
  Parts --> Atomic1
  Parts --> Atomic2
  Atomic1 --> Conj
  Atomic2 --> Conj
  Conj --> Result
```

------------------------------------------------------------------------

## **3.3 Key to Diagram**

-   **Lexicon** assigns denotations.\
-   **Parser** determines syntactic structure.\
-   **T-clauses** recursively compute truth.\
-   **Compositionality**: truth of compound depends solely on truth of
    immediate parts.\
-   **Interpretation**: a T-theory chosen by maximizing truth &
    coherence (charity).

------------------------------------------------------------------------

# End of Document
