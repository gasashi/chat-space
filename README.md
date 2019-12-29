# DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|index: true, null: false, unique: true|

### Association
- has_many :groups, through: :groups_users
- has_many :messages
- has_many :groups_users

## groups table

|Column|Type|Options|
|------|----|-------|
|group|string|index: true, null: false|

### Association
- has_many :users, through: :groups_users
- has_many :messages
- has_many :groups_users

## groups_users table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messages table

|Column|Type|Options|
|------|----|-------|
|body|text|foreign_key: true|
|image|string|foreign_key: true|
|group_id|references|null: false, foreign_key: true|
|users_id|references|null: false, foreign_key: true|

### Association
- belongs_to :users
- belongs_to :group
