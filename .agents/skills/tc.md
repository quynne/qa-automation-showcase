# /tc — Generate Test Cases

Given an API doc, feature URL, or Figma design, produce a structured test plan.

## Output format

File: `_src/<layer>/docs/<domain>/test_plan.md`

```markdown
# Test Plan: <Feature Name>

## Valid (happy path)
- [ ] TC-V01: <description>
- [ ] TC-V02: <description>

## Invalid (negative / boundary)
- [ ] TC-I01: <description>
- [ ] TC-I02: <description>

## Security
- [ ] TC-S01: <description>
- [ ] TC-S02: <description>
```

## Rules
- Minimum 3 Valid, 3 Invalid, 2 Security test cases per feature.
- Each test case must have a clear expected result.
- STOP after generating. Wait for user approval before /impl.
