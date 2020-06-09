# データベース
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|foreign_key: true|
|group|references|foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|string||
|image|string||
|user|references|foreign_key: true|
|group|references|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group