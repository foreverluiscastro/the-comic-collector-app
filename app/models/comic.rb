class Comic < ApplicationRecord
    belongs_to :user
    validates :title, presence: true

    scope :publisher, -> { where(publisher: "Marvel Comics")}
end
