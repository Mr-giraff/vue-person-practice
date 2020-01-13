## 基础用法
```
actions = [
  {
    label: 'A',
    action: 'A',
    disabled: false,
  }
]

<table-row-action
    onAction={onAction}
    actions={actions}
/ >

```

## 高级用法 - 更多选项
```
actions = [
  {
    label: '更多',
    action: 'more',
    children: [
      {
        label: 'A',
        action: 'A',
        disabled: false,
      }
    ]
  }
]

<table-row-action
    onAction={onAction}
    actions={actions}
/ >

```
