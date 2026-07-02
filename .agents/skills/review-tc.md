# /review-tc — Multi-Agent Test Case Review

Run all 4 agent perspectives on the test plan before implementation.

## Agent Reviews

### Dev Agent
- Are test cases technically feasible with the current stack?
- Are there implementation complexities to flag?
- Missing edge cases from a code perspective?

### Tester Agent
- Is Valid/Invalid/Security coverage complete?
- Are boundary values covered?
- Flakiness risk on any scenario?

### BA Agent
- Do test cases map to acceptance criteria?
- Any requirement mismatches?
- Missing business rules?

### PM Agent
- Are priorities correct (smoke vs regression)?
- Any out-of-scope scenarios?
- Risk level for each test group?

## Output
Consolidated review with: ✅ Approved / ⚠️ Needs revision / ❌ Rejected
List specific changes required before proceeding to /impl.
